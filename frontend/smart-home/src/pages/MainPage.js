import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="main-page">
      <h1>Welcome to the Main Page</h1>
      <div className="button-container">
        <button onClick={() => navigateTo('/login')}>Login Page</button>
        <button onClick={() => navigateTo('/register')}>Register Page</button>
        <button onClick={() => navigateTo('/manager')}>Manager Page</button>
        <button onClick={() => navigateTo('/manager-home')}>Manager Home Page</button>
        <button onClick={() => navigateTo('/add')}>Add Page</button>
        <button onClick={() => navigateTo('/edit/1')}>Edit Page</button> {/* Example ID */}
        <button onClick={() => navigateTo('/character/1')}>Character Detail Page</button> {/* Example ID */}
        <button onClick={() => navigateTo('/user-info')}>User Info Page</button>
        <button onClick={() => navigateTo('/admin')}>Admin Page</button>
        <button onClick={() => navigateTo('/user')}>User Page</button>
      </div>
    </div>
  );
}

export default MainPage;
