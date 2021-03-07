import { useEffect, useState } from 'react';

import firebase from '../utils/config';
import { Link, useHistory } from 'react-router-dom';

import '../styles/contactlist.css';

function Contactlist() {
  const [contact, setContact] = useState([]);
  let history = useHistory();

  const ref = firebase.firestore().collection('contactbook');

  const getContactList = () => {
    ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setContact(list);
    });
  };

  const deleteContact = (id) => {
    console.log(id);
    ref
      .doc(id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  };

  const editContact = (id) => {
    history.push('/editcontact/' + id);
  };

  useEffect(() => {
    getContactList();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="d-flex listhead">
        <h3>My Contacts</h3>
        <Link to="/addcontact">
          <button className="button-listhead">
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5 14C9.0913 14 10.6174 13.3679 11.7426 12.2426C12.8679 11.1174 13.5 9.5913 13.5 8C13.5 6.4087 12.8679 4.88258 11.7426 3.75736C10.6174 2.63214 9.0913 2 7.5 2C5.9087 2 4.38258 2.63214 3.25736 3.75736C2.13214 4.88258 1.5 6.4087 1.5 8C1.5 9.5913 2.13214 11.1174 3.25736 12.2426C4.38258 13.3679 5.9087 14 7.5 14ZM8.25 5.75C8.25 5.55109 8.17098 5.36032 8.03033 5.21967C7.88968 5.07902 7.69891 5 7.5 5C7.30109 5 7.11032 5.07902 6.96967 5.21967C6.82902 5.36032 6.75 5.55109 6.75 5.75V7.25H5.25C5.05109 7.25 4.86032 7.32902 4.71967 7.46967C4.57902 7.61032 4.5 7.80109 4.5 8C4.5 8.19891 4.57902 8.38968 4.71967 8.53033C4.86032 8.67098 5.05109 8.75 5.25 8.75H6.75V10.25C6.75 10.4489 6.82902 10.6397 6.96967 10.7803C7.11032 10.921 7.30109 11 7.5 11C7.69891 11 7.88968 10.921 8.03033 10.7803C8.17098 10.6397 8.25 10.4489 8.25 10.25V8.75H9.75C9.94891 8.75 10.1397 8.67098 10.2803 8.53033C10.421 8.38968 10.5 8.19891 10.5 8C10.5 7.80109 10.421 7.61032 10.2803 7.46967C10.1397 7.32902 9.94891 7.25 9.75 7.25H8.25V5.75Z"
                fill="white"
              />
            </svg>
            Add new Contacts
          </button>
        </Link>
      </div>
      {contact.length === 0 ? (
        <>
          <div className="emptylist d-flex flex-column">
            <svg
              width="57"
              height="57"
              viewBox="0 0 57 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.8 8.55C22.8 7.79413 23.1003 7.06922 23.6347 6.53474C24.1692 6.00026 24.8941 5.7 25.65 5.7H31.35C32.1059 5.7 32.8308 6.00026 33.3653 6.53474C33.8997 7.06922 34.2 7.79413 34.2 8.55C34.2 9.30586 33.8997 10.0308 33.3653 10.5653C32.8308 11.0997 32.1059 11.4 31.35 11.4H25.65C24.8941 11.4 24.1692 11.0997 23.6347 10.5653C23.1003 10.0308 22.8 9.30586 22.8 8.55Z"
                fill="#B1B1B1"
              />
              <path
                d="M17.1 8.55C15.5883 8.55 14.1385 9.15054 13.0695 10.2195C12.0005 11.2885 11.4 12.7383 11.4 14.25V45.6C11.4 47.1117 12.0005 48.5616 13.0695 49.6305C14.1385 50.6995 15.5883 51.3 17.1 51.3H39.9C41.4117 51.3 42.8616 50.6995 43.9305 49.6305C44.9995 48.5616 45.6 47.1117 45.6 45.6V14.25C45.6 12.7383 44.9995 11.2885 43.9305 10.2195C42.8616 9.15054 41.4117 8.55 39.9 8.55C39.9 10.8176 38.9992 12.9923 37.3958 14.5958C35.7923 16.1992 33.6176 17.1 31.35 17.1H25.65C23.3824 17.1 21.2077 16.1992 19.6042 14.5958C18.0008 12.9923 17.1 10.8176 17.1 8.55Z"
                fill="#B1B1B1"
              />
            </svg>
            <h6 className="mt-3">Please start adding new contacts here.</h6>
          </div>
        </>
      ) : (
        <>
          <div className="info row">
            {contact.map((c) => (
              <div className="col-md-4" key={c.id}>
                <div className="shadow p-3 mb-5 bg-body rounded">
                  <h6>{c.Name}</h6>
                  <div className="d-flex info_content">
                    <div className="d-flex flex-column">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7 2C6.46957 2 5.96086 2.21071 5.58579 2.58579C5.21071 2.96086 5 3.46957 5 4V16C5 16.5304 5.21071 17.0391 5.58579 17.4142C5.96086 17.7893 6.46957 18 7 18H13C13.5304 18 14.0391 17.7893 14.4142 17.4142C14.7893 17.0391 15 16.5304 15 16V4C15 3.46957 14.7893 2.96086 14.4142 2.58579C14.0391 2.21071 13.5304 2 13 2H7ZM10 16C10.2652 16 10.5196 15.8946 10.7071 15.7071C10.8946 15.5196 11 15.2652 11 15C11 14.7348 10.8946 14.4804 10.7071 14.2929C10.5196 14.1054 10.2652 14 10 14C9.73478 14 9.48043 14.1054 9.29289 14.2929C9.10536 14.4804 9 14.7348 9 15C9 15.2652 9.10536 15.5196 9.29289 15.7071C9.48043 15.8946 9.73478 16 10 16Z"
                            fill="#777777"
                          />
                        </svg>
                        mobile
                      </span>
                      <p>{c.Cellphone}</p>
                    </div>
                    <div className="d-flex flex-column">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H5.153C5.38971 2.00011 5.6187 2.08418 5.79924 2.23726C5.97979 2.39034 6.10018 2.6025 6.139 2.836L6.879 7.271C6.91436 7.48222 6.88097 7.69921 6.78376 7.89003C6.68655 8.08085 6.53065 8.23543 6.339 8.331L4.791 9.104C5.34611 10.4797 6.17283 11.7293 7.22178 12.7782C8.27072 13.8272 9.52035 14.6539 10.896 15.209L11.67 13.661C11.7655 13.4695 11.9199 13.3138 12.1106 13.2166C12.3012 13.1194 12.5179 13.0859 12.729 13.121L17.164 13.861C17.3975 13.8998 17.6097 14.0202 17.7627 14.2008C17.9158 14.3813 17.9999 14.6103 18 14.847V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H15C7.82 18 2 12.18 2 5V3Z"
                            fill="#777777"
                          />
                        </svg>
                        Phone
                      </span>
                      <p>{c.Homephone}</p>
                    </div>
                    <div className="d-flex flex-column">
                      <span>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5 6.75C8.09674 6.75 8.66903 6.51295 9.09099 6.09099C9.51295 5.66903 9.75 5.09674 9.75 4.5C9.75 3.90326 9.51295 3.33097 9.09099 2.90901C8.66903 2.48705 8.09674 2.25 7.5 2.25C6.90326 2.25 6.33097 2.48705 5.90901 2.90901C5.48705 3.33097 5.25 3.90326 5.25 4.5C5.25 5.09674 5.48705 5.66903 5.90901 6.09099C6.33097 6.51295 6.90326 6.75 7.5 6.75ZM2.25 13.5C2.25 12.8106 2.3858 12.1279 2.64963 11.4909C2.91347 10.854 3.30018 10.2752 3.78769 9.78769C4.2752 9.30018 4.85395 8.91347 5.49091 8.64963C6.12787 8.3858 6.81056 8.25 7.5 8.25C8.18944 8.25 8.87213 8.3858 9.50909 8.64963C10.146 8.91347 10.7248 9.30018 11.2123 9.78769C11.6998 10.2752 12.0865 10.854 12.3504 11.4909C12.6142 12.1279 12.75 12.8106 12.75 13.5H2.25Z"
                            fill="#777777"
                          />
                        </svg>
                        relation
                      </span>
                      <p>{c.Relation}</p>
                    </div>
                  </div>
                  <div className="info__actions">
                    <button
                      onClick={() => editContact(c.id)}
                      className="info__actions-edit"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.414 2.586C17.0389 2.21106 16.5303 2.00043 16 2.00043C15.4697 2.00043 14.9611 2.21106 14.586 2.586L7 10.172V13H9.828L17.414 5.414C17.7889 5.03894 17.9996 4.53033 17.9996 4C17.9996 3.46967 17.7889 2.96106 17.414 2.586Z"
                          fill="#AB15E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4H8C8.26522 4 8.51957 4.10536 8.70711 4.29289C8.89464 4.48043 9 4.73478 9 5C9 5.26522 8.89464 5.51957 8.70711 5.70711C8.51957 5.89464 8.26522 6 8 6H4V16H14V12C14 11.7348 14.1054 11.4804 14.2929 11.2929C14.4804 11.1054 14.7348 11 15 11C15.2652 11 15.5196 11.1054 15.7071 11.2929C15.8946 11.4804 16 11.7348 16 12V16C16 16.5304 15.7893 17.0391 15.4142 17.4142C15.0391 17.7893 14.5304 18 14 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V6Z"
                          fill="#AB15E0"
                        />
                      </svg>
                      edit contact
                    </button>
                    <button
                      onClick={() => deleteContact(c.id)}
                      className="info__actions-delete"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9 2C8.81434 2.0001 8.63237 2.05188 8.47447 2.14955C8.31658 2.24722 8.18899 2.38692 8.106 2.553L7.382 4H4C3.73478 4 3.48043 4.10536 3.29289 4.29289C3.10536 4.48043 3 4.73478 3 5C3 5.26522 3.10536 5.51957 3.29289 5.70711C3.48043 5.89464 3.73478 6 4 6V16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18H14C14.5304 18 15.0391 17.7893 15.4142 17.4142C15.7893 17.0391 16 16.5304 16 16V6C16.2652 6 16.5196 5.89464 16.7071 5.70711C16.8946 5.51957 17 5.26522 17 5C17 4.73478 16.8946 4.48043 16.7071 4.29289C16.5196 4.10536 16.2652 4 16 4H12.618L11.894 2.553C11.811 2.38692 11.6834 2.24722 11.5255 2.14955C11.3676 2.05188 11.1857 2.0001 11 2H9ZM7 8C7 7.73478 7.10536 7.48043 7.29289 7.29289C7.48043 7.10536 7.73478 7 8 7C8.26522 7 8.51957 7.10536 8.70711 7.29289C8.89464 7.48043 9 7.73478 9 8V14C9 14.2652 8.89464 14.5196 8.70711 14.7071C8.51957 14.8946 8.26522 15 8 15C7.73478 15 7.48043 14.8946 7.29289 14.7071C7.10536 14.5196 7 14.2652 7 14V8ZM12 7C11.7348 7 11.4804 7.10536 11.2929 7.29289C11.1054 7.48043 11 7.73478 11 8V14C11 14.2652 11.1054 14.5196 11.2929 14.7071C11.4804 14.8946 11.7348 15 12 15C12.2652 15 12.5196 14.8946 12.7071 14.7071C12.8946 14.5196 13 14.2652 13 14V8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7Z"
                          fill="#E03232"
                        />
                      </svg>
                      delete contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Contactlist;
