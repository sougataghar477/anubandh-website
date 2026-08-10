import LoadingIcon from "./LoadingIcon";

export default function Loader(){
   return <div className="min-h-screen flex items-center justify-center bg-[#0c0d10] text-white gap-2">
        <span>Loading</span> 
        <LoadingIcon/>
      </div>
}