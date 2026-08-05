export function checkValidation(text :string){
    if(!text.trim()){
        return false;
    }
    return true;
}
export const formatLabel = (value: string) => {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};