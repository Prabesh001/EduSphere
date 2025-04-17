import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { PaymentContext } from "../../App";

const EsewaPayment = ({ amount, user }) => {
  const { setIsPaying } = useContext(PaymentContext);
  const transactionId = uuidv4();
  const userDetails = JSON.stringify({
    name: user.name,
    id: user.id,
    endPoint: user.endpoint,
    price: user.coursePrice
  });

  useEffect(() => {
    if (userDetails) {
      localStorage.setItem("userDetails", userDetails);
    }
  }, [userDetails]);

  const [formData, setFormData] = useState({
    amount: Number(amount),
    tax_amount: "0",
    total_amount: Number(amount),
    transaction_uuid: transactionId,
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: `http://localhost:5173/paymentsuccess`,
    failure_url: `http://localhost:5173/paymentfailure`,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
  });

  const secret = "8gBm/:&EnhH.1/q";

  const generateSignature = (total_amount, transaction_uuid, product_code) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  useEffect(() => {
    const newAmount = Number(amount);
    const newUUID = uuidv4();
    const newSignature = generateSignature(
      newAmount,
      newUUID,
      formData.product_code
    );

    setFormData((prev) => ({
      ...prev,
      amount: newAmount,
      total_amount: newAmount,
      transaction_uuid: newUUID,
      signature: newSignature,
    }));
  }, [amount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPaying(true);
    localStorage.setItem("paying", "true");
    document.getElementById("payment-form").submit();
  };

  return (
    <div>
      <form
        id="payment-form"
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
      >
        {Object.entries(formData).map(([key, value]) =>
          key !== "signature" && key !== "secret" ? (
            <input
              key={key}
              type="hidden"
              name={key}
              value={value}
              autoComplete="off"
            />
          ) : null
        )}
        <input
          type="hidden"
          name="signed_field_names"
          value={formData.signed_field_names}
        />
        <input type="hidden" name="signature" value={formData.signature} />

        <button
          className="payment-btn bg-green-600 text-white px-6 py-2 rounded mt-4"
          type="submit"
          onClick={handleSubmit}
        >
          Pay with eSewa
        </button>
      </form>
    </div>
  );
};

export default EsewaPayment;
