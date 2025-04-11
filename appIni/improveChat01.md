## Ajustes no projeto 


### 1. filtrar para mostrar somente contatos do user logado.  alterar **ContactListPage.jsx**  para esse codigo.

```
```


### 2. ajustar   **AddContactPage.jsx**  =>  SALVAR IDUSER DO CONTATO  . ajustes pontuais.

a. após as **const** no inicio. 
```
  const [contactUserId, setContactUserId] = useState(null);
```

b.   dentro da   const **fetchUserByEmail** = async (email) => {  , incluir setContactUserId

Após os comandos 
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
INCLUIR:
```
        setContactUserId(querySnapshot.docs[0].id); // Armazena o ID do usuário encontrado
```
c.  dentro de **addDoc** , incluiur contactUserId

SUBSTITUIR O TRECHO await addDoc:

```
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        contactUserId: contactUserId || null, 
        createdBy: auth.currentUser.uid, // Usuário autenticado que adicionou o contato
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
```


### 3. Ajustar **ChatPage.jsx** 

a. alterar o   **useEffect(() => {**  , substituir por esse codigo com 2 useEffect separados.


```
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contactRef = doc(db, 'contacts', id);
        const contactSnap = await getDoc(contactRef);
        if (contactSnap.exists()) {
          setContact(contactSnap.data());
        }
      } catch (error) {
        console.error("Erro ao buscar contato:", error);
      }
    };
  
    fetchContact();
  }, [id]);

  useEffect(() => {
    if (!contact || !contact.contactUserId || !myUserId) return;
  
    const chatKey = [myUserId, contact.contactUserId].sort().join('_');
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, where('chatKey', '==', chatKey), orderBy('timestamp', 'asc'));
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesList);
    });
  
    return () => unsubscribe();
  }, [contact, myUserId]);
```

b. alterar a **handleSendMessage**  para ajuste do chatKey. Salvar sempre origem_destino da msg.

```
  
  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !contact || !contact.contactUserId) return;

    const chatKey = [myUserId, contact.contactUserId].sort().join('_');

    try {
      await addDoc(collection(db, 'messages'), {
        contactId: id,
        senderId: myUserId,
        chatKey,
        text: newMessage,
        timestamp: serverTimestamp()
      });
      setNewMessage('');
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

```

c.  alterar o input  para permitir enviar msg com [Enter]

```
        <form 
          onSubmit={(e) => {
            e.preventDefault(); // Evita o recarregamento da página
            handleSendMessage();
          }} 
          className="chat-input"
         >
          <input 
            type="text" 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
            placeholder="Digite uma mensagem..."
          />
          <button type="submit">Enviar</button>
        </form>
```


### 4. ajustar o ContactItem , para mostrar cor distinta se contato nao tem user.

a. alterar component **ContactItem.jsx**
```
/* eslint-disable react/prop-types */
import './ContactItem.css';

// eslint-disable-next-line react/prop-types
const ContactItem = ({ user, onEdit, onDelete }) => {
  const isInvalidUser = !user.contactUserId;

  return (
    <div className={`user-item ${isInvalidUser ? 'invalid-contact' : ''}`}>
      <img src={user.photo} alt={user.fullName} className="user-photo" />
      <div className="user-info">
        <h3 className="user-name">{user.fullName}</h3>
        <p className="user-phone">{user.phone}</p>
      </div>
      <div className="user-actions">
        <button onClick={(e) => { e.stopPropagation(); onEdit(user.id)}}>Editar</button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(user.id)}}>Excluir</button>
      </div>
    </div>
  );
};

export default ContactItem;





```

b. incluir ao final do **ContactItem.css**


```
  .user-item.invalid-contact {
    background-color: #ffe6e6; /* tom leve de vermelho */
    border: 1px solid #ff5c5c;
  }
```
  
