import LoadingIcon from "./LoadingIcon";

export default function Loader(){
   return <div className="min-h-screen flex items-center justify-center bg-white text-black gap-2">
        <span>Loading</span> 
        <LoadingIcon/>
      </div>
}