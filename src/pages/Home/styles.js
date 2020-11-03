import styled from 'styled-components';
import ReactModal from 'react-modal';

export const Container = styled.div`
  width: 90%;
  max-width: 1180px;
  margin: 0 auto;
`;

export const Header = styled.header`
  padding: 32px 0;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #000;
    }

    a {
      text-decoration: none;
      color: #000;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 150px;

  img {
    width: 300px;
    height: 170px;
  }
`;

export const SelectedImages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 400px;
  button {
    width: 100px;
    height: 100px;
  }
`;

export const ModalGallery = styled(ReactModal)`
  .modal-background {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(124, 124, 124, 0.384);
    width: 100vw;
    height: 100vh;
  }

  .ConfirmModal-container {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translateX(-50%) translateY(-50%);
    height: 460px;
    width: 500px;
    background-color: white;
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.08));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
  }

  .close-icon-modal {
    position: absolute;
    top: 3%;
    left: 98%;
    transform: translateX(-100%);
    color: orangered;
    cursor: pointer;
    font-size: 26px;
  }

  .confirm-modal-text-1 {
    font-size: 16px;
    color: rgb(66, 66, 66);
  }

  .confirm-modal-text-2 {
    font-size: 22px;
    font-weight: bold;
    color: rgb(66, 66, 66);
    text-transform: uppercase;
  }

  .btn-modal-line {
    display: flex;
    width: 400px;
    justify-content: space-around;
    margin-top: 15px;
  }

  .modal-cancel-btn {
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    font-size: 18px;
    padding: 5px;
    width: 120px;
    background-color: rgba(255, 68, 0, 0.836);
    color: white;
    border-radius: 4px;
  }

  .modal-upload-btn {
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    font-size: 18px;
    padding: 5px;
    width: 120px;
    background-color: yellow;
    color: white;
    border-radius: 4px;
  }

  .modal-confirm-btn {
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    font-size: 18px;
    padding: 5px;
    width: 120px;
    background-color: rgba(0, 128, 0, 0.829);
    color: white;
    border-radius: 4px;
  }
`;

export const Carousel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
`;
