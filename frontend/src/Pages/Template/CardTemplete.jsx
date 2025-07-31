import { Link } from "react-router-dom";

const CardTemplete = ({data}) => {

    return (
          <div  className="flex flex-wrap items-center justify-center gap-4">
            <div className="bg-white rounded-2xl pb-4 overflow-hidden border border-gray-500/30">
                <img className="w-64 h-52 object-cover object-top"  src={data.tempLogo} alt="Cover Page Picture" />
                <div className="flex flex-col items-center">
                    <p className={`font-medium mt-3 ${data.fullName.length>18 && "text-[14px]"}`}>{data.fullName}</p>
                </div>
            </div>
         </div>
    );
}
export default CardTemplete;