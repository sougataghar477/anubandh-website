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

export const fileToObject = (file) => {
  if (!file) return null;

  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
  };
};

const formatStatus = (status?: string) =>
  status
    ? status
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

export const formatDateTime = (dateStr: string) => 
  new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });