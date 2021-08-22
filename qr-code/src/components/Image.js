import NextImage from "next/image";

const Image = ({ className = '', ...props }) => (
  <div className="unset-img">
    <NextImage className={`${className} custom-img`} layout="fill" {...props} />
  </div>
)

export default Image