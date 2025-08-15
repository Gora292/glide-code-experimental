// function.js

async function urlToBase64(imageUrl) {
  // Vérifie si une URL a bien été fournie
  if (!imageUrl) {
    return "Erreur : Aucune URL d'image fournie.";
  }

  try {
    // 1. Télécharge les données de l'image depuis l'URL
    const response = await fetch(imageUrl);
    // 2. Transforme la réponse en données binaires (un "blob")
    const blob = await response.blob();

    // 3. Lit le blob et le convertit en Data URL (Base64)
    // On utilise une Promise pour gérer le caractère asynchrone de FileReader
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // Quand la lecture est finie, on retourne le résultat
      reader.onerror = reject; // En cas d'erreur, on la propage
      reader.readAsDataURL(blob); // Démarre la lecture du blob
    });

  } catch (error) {
    // Si une erreur se produit (souvent une erreur CORS), on retourne un message clair
    return `Erreur de conversion : ${error.message}. Vérifiez l'URL ou un problème de CORS.`;
  }
}
