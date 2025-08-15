// function.js
async function urlToBase64(imageUrl) {
  if (!imageUrl || !imageUrl.value) {
    return "Erreur : URL manquante.";
  }

  try {
    const response = await fetch(imageUrl.value);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    return `Erreur de conversion : ${error.message}. Problème de CORS ou URL invalide.`;
  }
}

// Ligne nécessaire pour la compatibilité avec Glide
window.function = urlToBase64;
