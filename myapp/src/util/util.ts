export function sizeChange(value:string) {
    const temp = parseFloat(value);
    if (temp < 1024) {
      return `${temp.toFixed(2)} KB`
    } else if (temp > 1024 && temp / 1024 < 1024) {
      return `${(temp / 1024).toFixed(2)} M`
    } else {
      return `${(temp / 1024 / 1024).toFixed(2)} G`
    }
  };