// ====================
// constante de l'api
// ====================
// ce fichier peut centralisé toutes les api Symfony
// l'avantage : Modifier l'url de base en un seul endroit

// Url racine du serveur backend
export const API_ROOT = 'http://localhost:8088';

// l'Url de base de l'api plateform 
export const API_URL = `${API_ROOT}/api`;

// ==============================
// Url des ressources statiques 
// ==============================

// images generales (logo, etc ... )
export const IMAGE_URL = `${API_ROOT}/images`;

// Avatar des utilisateurs
export const AVATAR_URL = `${IMAGE_URL}/avatars`;

// cover des albums 
export const ALBUM_URL = `${API_ROOT}/upload/images/albums`;

// photo des artistes 
export const ARTIST_URL = `${API_ROOT}/upload/images/artists`;

// fichier audio mp3 
export const MUSIC_URL = `${API_ROOT}/upload/files/music`;