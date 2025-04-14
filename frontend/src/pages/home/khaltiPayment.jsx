import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";
import { baseUrl } from "../../config";

const KhaltiPayment = ({ id, getAllDataEnroll }) => {
  // const [amount, setAmount] = useState("")

  let token = localStorage.getItem("token");
  // let { id } = useParams();
  let config = {
    // replace this key with yours
    publicKey: "test_public_key_44701898c6514603a6192e054d893a54",
    productIdentity: "1234567890",
    productName: "Test",
    productUrl: "http://gameofthrones.com/buy/Dragons",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        if (payload) {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          };

          axios
            .post(`${baseUrl}/user/payment/${id}`, payload, config)
            .then((res) => {
              if (res.data.status === 200) {
                alert("payment is done successfully");
                getAllDataEnroll();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        alert("payment portal is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  let checkout = new KhaltiCheckout(config);

  const handleClick = () => {
    checkout.show({ amount: 1000 });
    // setCheck(order);
  };

  return (
    <div>
      <button onClick={() => handleClick()}>pay bro</button>
    </div>
  );
};

export default KhaltiPayment;
