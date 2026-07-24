export default function Label({text}:{text:string}){
    return <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
              {text}
    </label>
}