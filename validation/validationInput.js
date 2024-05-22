export  const validateLastName = (value) => {
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/;
    if (!value) {
      return "Le nom est obligatoire";
    } else if (!regex.test(value) || value.length < 2 || value.length > 30) {
      return "Le nom doit être composé de 2 à 30 lettres";
    } else {
      return "";
    }
}

export  const validateFirstName = (value) => {
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/;
    if (!value) {
      return "Le prénom est obligatoire";
    } else if (!regex.test(value) || value.length < 2 || value.length > 30) {
      return "Le prénom doit être composé de 2 à 30 lettres";
    } else {
      return "";
    }
}

export const validateEmail = (value) => {
    // regex qui correspond à une structure d'e-mail standard
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    
    if (!value.match(emailRegex)) {
      return "Email non valide";
    }
    return "";
  };

  
  export const validatePassword = password => {
    const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,30}$/
    if (!pattern.test(password)) {
        return "Mot de passe non valide" 
    } else {
        return ""
    }
};

export const validatePostalCode = (value) => {
  if (value === "") return "";
  // regex qui correspond à une structure de code postal de 5 chiffres
  const postalCodeRegex = /^[0-9]{5}$/;
  if (!value.match(postalCodeRegex)) {
    return "Code postal non valide";
  }
  return "";
};

export const validateGenre = (value) => {
  const allowedValues = ['femme', 'homme', 'nbinaire'];
  if (!value) {
      return "Le genre est obligatoire";
  } else if (!allowedValues.includes(value)) {
      return "Valeur de genre non valide";
  } else {
      return "";
  }
}

export const validateDateOfBirth = (date) => {
  if (!date) {
      return "La date de naissance est obligatoire";
  } else if (date > new Date()) {
      return "La date de naissance ne peut pas être dans le futur";
  } else {
      return "";
  }
}

export const validateIdSun = (value) => {
  if (value === "") return "";

  // regex qui correspond à une structure d' idSun de 5 chiffres
  const idSunRegex = /^[0-9]{5}$/;
  if (!value.match(idSunRegex)) {
    return "IdSun non valide";
  }
  return "";
};

export const validateTelephone = (telephone) => {
  if (telephone === "") return "";
  // regex qui correspond à un numéro de téléphone de 10 chiffres consécutifs sans aucun autre caractère.
  const phoneRegex = /^\d{10}$/;

  if (!phoneRegex.test(telephone)) {
    return "Numéro de téléphone non valide";
  }
  return "";
};


