export const bigintToDate = (bigintValue: bigint): string => {
    // Converti il BigInt in un numero intero (millisecondi)
    const timestamp = Number(bigintValue) * 1000;
  
    // Crea un oggetto Date usando il timestamp
    const date = new Date(timestamp);
  
    // Controlla se la data è valida
    if (isNaN(date.getTime())) {
      throw new Error("Valore BigInt non valido per la conversione in data.");
    }
  
    // Restituisci la data nel formato 'yyyy-mm-dd hh:mm:ss' nel formato locale
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Imposta l'ora in formato 24 ore
    });
  };

  

  export const getErrorMessage = (error: any) => {
    // console.log('❌❌❌ getErrorMessage', error)
    
    if (error && (typeof error === 'string' || error instanceof String)) {
        return error
    } else if (error?.response?.data?.error?.message) {
        return error.response.data.error.message
    } else if (error?.response?.data?.error?.detail) {
        return error.response.data.error.detail
    } else if (error?.response?.data?.error) {
        return error.response.data.error
    } else if (error?.response?.data?.message) {
        return error.response.data.message
    } else if (error?.request?.statusText) {
        return error.request.statusText
    } else if (error?.request?.status) {
        return error.request.status
    } else if (error?.message) {
        return error.message
    } else {
        return "Server error"
    }
  }

export const shortAdrs = (address: string): string => {
    if (!address || address.length < 8) {
      throw new Error("Invalid Ethereum address");
    }
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };
  
export const hexToNum = (hex: string): number => {
    if (!hex || typeof hex !== 'string') {
      throw new Error("Invalid hex value");
    }
  
    return parseInt(hex, 16);
  };
  