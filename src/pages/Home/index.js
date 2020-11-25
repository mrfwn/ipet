import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FcPicture } from 'react-icons/fc';
import { FaTimesCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {
  Container,
  Content,
  Header,
  HeaderContent,
  Profile,
  SelectedImages,
  ModalGallery,
  Carousel,
} from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import logoImg from '../../assets/fluffymonster.png';
import api from '../../services/api';
// import apiPy from '../../services/apiPy';
import arrowBone from '../../assets/arrow.png';
import waiting from '../../assets/waiting.gif';
import loading from '../../assets/loading.gif';

function useAsyncState(initialValue) {
  const [value, setValue] = useState(initialValue);
  const setter = (x) =>
    new Promise((resolve) => {
      setValue(x);
      resolve(x);
    });
  return [value, setter];
}

const Home = () => {
  const { user, signOut } = useAuth();
  const { addToast } = useToast();
  const [showGallery, setShowGallery] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [image1, setImage1] = useState();
  const [selectImage, setSelectImage] = useState();
  const [selectButton, setSelectButton] = useState();
  const [pet, setPet] = useAsyncState(waiting);
  const [isLoading, setLoading] = useState(false);

  const match = ['image/jpeg', 'image/png'];

  const handleShowGallery = useCallback(
    (buttonOption) => {
      gallery && setSelectImage(0);
      setSelectButton(buttonOption);
      setShowGallery(true);
    },
    [gallery]
  );

  const handleCancelGallery = useCallback(() => {
    setSelectButton('');
    setShowGallery(false);
  }, []);

  const handleSetImage = useCallback(() => {
    selectButton === 'image1' && setImage1(gallery[selectImage]);
    setSelectButton('');
    setShowGallery(false);
    setPet(waiting);
  }, [selectButton, selectImage, gallery]);

  const handleAddFile = useCallback(
    (e) => {
      if (e.target.files) {
        const file = e.target.files[0];
        const data = new FormData();
        try {
          if (match.indexOf(file.type) >= 0) {
            data.append('file', file);
            api.post('images', data).then((response) => {
              setGallery(response.data);
              addToast({
                type: 'success',
                title: 'Arquivo enviado com sucesso!',
              });
            });
          }
        } catch (err) {
          addToast({
            type: 'error',
            title: 'Não foi possível anexar o arquivo!',
            description: 'Por favor verificar os formatos e tamanho aceito!',
          });
        }
      }
    },
    [addToast, match]
  );

  const handleLeftGallery = useCallback(() => {
    if (selectImage > 0) {
      setSelectImage(selectImage - 1);
    }
  }, [selectImage]);

  const handleRightGallery = useCallback(() => {
    if (selectImage < gallery.length - 1) {
      setSelectImage(selectImage + 1);
    }
  }, [gallery, selectImage]);

  const handleGeneratePet = useCallback(() => {
    const imagesIds = [];
    image1 && imagesIds.push(image1.name);
    setLoading(true);
    api.post('pets', imagesIds).then((response) => {
      setPet(response.data.path_url);
      setLoading(false);
    });
  }, [image1, pet]);

  useEffect(() => {
    api.get('images').then((response) => {
      setGallery(response.data);
    });
  }, [gallery]);
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Dogmon" />
          <Profile>
            <div>
              <span>Bem-vindo,</span>
              <Link to="/">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>

        <h2>
          Faça o upload de sua foto e clique na seta para ver a mágica acontecer
          ;)
        </h2>
      </Header>

      <Content>
        <SelectedImages>
          {image1 ? (
            <img
              style={{
                border: '5px solid #ff9000',
                cursor: 'pointer',
              }}
              src={image1.path_url}
              onClick={() => handleShowGallery('image1')}
              alt="foto1"
            />
          ) : (
            <button
              style={{
                borderWidth: '5px',
                borderStyle: 'dashed',
                borderColor: '#ff9000',
                background: 'transparent',
              }}
              type="button"
              onClick={() => handleShowGallery('image1')}
            >
              <FcPicture size={50} />
            </button>
          )}
        </SelectedImages>
        {isLoading ? (
          <img src={loading} alt="loading" style={{ margin: '0 auto' }} />
        ) : (
          <button
            style={{ border: '0', background: 'transparent', margin: '0 20px' }}
            type="button"
            onClick={handleGeneratePet}
          >
            <img src={arrowBone} alt="arrow" />
          </button>
        )}
        <div>
          <img src={pet} alt="pet" />
        </div>
      </Content>
      <ModalGallery isOpen={showGallery}>
        <div className="modal-background">
          <div className="ConfirmModal-container">
            <FaTimesCircle
              onClick={handleCancelGallery}
              className="close-icon-modal"
            />
            <Carousel>
              {gallery.length > 0 && selectImage >= 0 ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  {selectImage !== 0 ? (
                    <button
                      style={{ border: '0', background: 'transparent' }}
                      type="button"
                      onClick={handleLeftGallery}
                    >
                      <FaArrowLeft size={36} color="#ff9000" />
                    </button>
                  ) : (
                    <button
                      style={{ border: '0', background: 'transparent' }}
                      type="button"
                    >
                      <FaArrowLeft
                        size={36}
                        color="rgba(124, 124, 124, 0.384)"
                      />
                    </button>
                  )}

                  {gallery !== undefined && (
                    <img
                      style={{ width: '300px', height: '300px' }}
                      src={gallery[selectImage].path_url}
                      alt="Dogmon"
                    />
                  )}
                  {selectImage !== gallery.length - 1 ? (
                    <button
                      style={{ border: '0', background: 'transparent' }}
                      type="button"
                      onClick={handleRightGallery}
                    >
                      <FaArrowRight size={36} color="#ff9000" />
                    </button>
                  ) : (
                    <button
                      style={{ border: '0', background: 'transparent' }}
                      type="button"
                    >
                      <FaArrowRight
                        size={36}
                        color="rgba(124, 124, 124, 0.384)"
                      />
                    </button>
                  )}
                </div>
              ) : (
                <h2>Ops... A galeria está vazia...</h2>
              )}
            </Carousel>
            <div className="btn-modal-line">
              <button
                type="button"
                className="modal-cancel-btn"
                onClick={handleCancelGallery}
              >
                Cancelar
              </button>

              <label htmlFor="file-upload" className="modal-upload-btn">
                <h3>Carregar</h3>
                <input
                  style={{ display: 'none' }}
                  type="file"
                  id="file-upload"
                  onChange={handleAddFile}
                />
              </label>
              <button
                type="submit"
                className="modal-confirm-btn"
                onClick={handleSetImage}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </ModalGallery>
    </Container>
  );
};

export default Home;
