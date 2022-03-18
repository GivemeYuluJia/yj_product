export function fileParse(file: any, type = 'base64'): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    switch (type) {
      case 'base64':
        reader.readAsDataURL(file);
        break;
      case 'buffer':
        reader.readAsArrayBuffer(file);
        break;
      default:
        throw new Error('Woring');
    }
    reader.onload = (ev) => {
      resolve(ev);
    };
  });
}
