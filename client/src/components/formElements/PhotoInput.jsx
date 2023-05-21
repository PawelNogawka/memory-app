import { useState } from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import './PhotoInput.scss';

const PhotoInput = ({ ariaLabel, label, values, setValues, errors, setErrors }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setErrors((prevErrors) => ({ ...prevErrors, photo: 'No file selected.' }));
      return;
    }

    const isValidSize = validateSize(file);
    const isValidFormat = validateFormat(file);

    if (!isValidSize || !isValidFormat) {
      setErrors((prevErrors) => ({ ...prevErrors, photo: 'Invalid size or format.' }));
      return;
    }

    try {
      setIsLoading(true);
      const base64String = await readFileAsync(file);
      setValues({ ...values, photo: base64String });
      setErrors((prevErrors) => ({ ...prevErrors, photo: null }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, photo: 'An error occurred while reading the file.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const validateSize = (file) => {
    const maxSizeInBytes = 200000;
    if (file.size > maxSizeInBytes) {
      return false;
    }
    return true;
  };

  const validateFormat = (file) => {
    const allowedFormats = ['image/jpeg', 'image/png', 'image/svg+xml'];
    if (!allowedFormats.includes(file.type)) {
      return false;
    }
    return true;
  };

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error('An error occurred while reading the file.'));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleRemoveBtnClick = () => {
    setValues({ ...values, photo: '' });
  };

  return (
    <div className="photo-input">
      <span className="photo-input__label">{label}</span>
      {isLoading && <span className="photo-input__loader">Loading...</span>}
      <label
        htmlFor="file"
        className={`photo-input__img ${values.photo && 'photo-input__img--white'}`}
      >
        {!values.photo && (
          <>
            <BsCloudUpload />
            <span>Upload</span>
          </>
        )}

        {values.photo && (
          <>
            <img src={values.photo} alt="Uploaded" />
            <button
              onClick={handleRemoveBtnClick}
              className="photo-input__remove-img"
              aria-label="Remove photo"
            >
              <AiOutlineClose />
            </button>
          </>
        )}
      </label>
      <input
        type="file"
        id="file"
        name="file"
        style={{ display: 'none' }}
        aria-label={ariaLabel}
        onChange={handleChange}
      />
    </div>
  );
};

export default PhotoInput;
