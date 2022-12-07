import React from 'react';
import Header from './components/Header';
import './App.css';
import ItemList from './components/ItemList';

const App = () => {

  const [user, setUser] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState(null);
  const [repos, setRepos] = React.useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name){
      setCurrentUser(newUser);

      const userRepos = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await userRepos.json();

      if(newRepos.length){
        setRepos(newRepos)
      }
    }else{
      alert('Usuário não encontrado. Por favor, tente novamente.')
      setCurrentUser(null)
    }
    
  }


  return (
    <div>
      <Header />
      <div className='content'>
        <div className='info'>
          <input name="usuario" value={user} onChange={(event)=>setUser(event.target.value)} placeholder='@username' />
          <button onClick={handleGetData}>Buscar</button>
        </div>

        {currentUser?.name? (
          <>
            <div className='perfil'>
              <img src={currentUser.avatar_url} className='pfp' alt="profile picture" />
              <div>
                <h3>{currentUser.name}</h3>
                <span>{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
            <hr />

            {repos?.length ? (
              <>
                <div>
                  <h4>Repositórios</h4>
                  {repos.map(repo => (
                    <ItemList key={repo.name} title={repo.name.length > 20 ? repo.name.slice(0,20)+'...' : repo.name} description={repo.description?.length > 50 ? repo.description?.slice(0,50)+'...' : repo.description}/>
                  ))}
                  
                </div>
              </>
            ) : null}
            
          </>
        ) : null}
        
      </div>
    </div>
  )
}

export default App