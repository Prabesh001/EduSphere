import { FaFacebook, FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-4 flex items-center justify-center flex-col gap-y-2 bg-blue-600 dark:bg-gray-800 p-4 text-gray-200">
      <div className="flex items-center justify-center flex-col">
        <p className="text-sm text-center my-3 lg:w-[90%]">
          Unlock Your Learning Potential with EduSphere! We are committed to
          delivering exceptional IT education, empowering students to master
          skills, achieve certifications, and thrive in their careers. Join us
          and transform your future today.
        </p>
        <p className="text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-bold dark:text-gray-200">EduSphere</span>. All
          rights reserved.
        </p>
      </div>

      <div className="social flex gap-x-3">
        <Link
          to="https://www.facebook.com/"
          target="_blank"
          className="flex items-center gap-x-2"
        >
          <FaFacebook size={22} />
        </Link>
        <Link
          to="https://www.instagram.com/"
          target="_blank"
          className="flex items-center gap-x-2"
        >
          <FaInstagram size={22} />
        </Link>
        <Link
          to="https://www.twitter.com/"
          target="_blank"
          className="flex items-center gap-x-2"
        >
          <FaXTwitter size={22} />
        </Link>
        <Link
          to="https://github.com"
          target="_blank"
          className="flex items-center gap-x-2"
        >
          <FaGithub size={22} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
