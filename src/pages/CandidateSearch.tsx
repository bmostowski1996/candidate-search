import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  // This needs to display a LOT more than just a header
  // const users = await searchGithub();
  // console.log(users);
  const [userInfo, setUserInfo] = useState<Candidate>({} as Candidate);
  
  // This useEffect will get called immediately when we load the page
  useEffect(() => {
    const fetchData = async () => {
      const result = await searchGithub();
      const username = result[0].login;
      const userInfo = await searchGithubUser(username);
      if (userInfo.bio && userInfo.bio.length > 150) {
        userInfo.bio = userInfo.bio.slice(0,150);
      }
      setUserInfo(userInfo);

      console.log(userInfo);
    };

    fetchData();
  }, []);

  const onClick = () => {
    console.log('Added new candidate to list of candidates.');
    const candidateList = JSON.parse(localStorage.getItem('candidateList') || '[]');
    candidateList.push(userInfo);
    localStorage.setItem('candidateList', JSON.stringify(candidateList));
  }

  return (<>
  <h1>Candidate Search</h1>
    <div>
      <div className='candbox'>
        <a href={userInfo.html_url}><img id='candimg' src={userInfo.avatar_url}></img></a>
        <h2>{userInfo.login}</h2>
        {userInfo.location && <p>Location: {userInfo.location}</p>}
        {userInfo.email && <p>Email: <a href={userInfo.email as string}>{userInfo.email}</a> </p>}
        {userInfo.company && <p>Company: {userInfo.company}</p>}
        {userInfo.bio && <p>Bio: {userInfo.bio}</p>}
      </div>

      <button onClick={onClick}>+</button>
      <button>-</button>
  </div>
  </>
  );
};

export default CandidateSearch;
