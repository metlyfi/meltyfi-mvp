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
  