import { useState, useEffect } from 'react';

const SavedCandidates = () => {

  const [candidateList, setCandidateList] = useState<Candidate[]>([]);

  // This runs when the page first loads
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('candidateList') || '[]');
    setCandidateList(storedList);
  }, []);

  const rejectCandidate = (index: number) => {
    setCandidateList(candidateList.slice(0,index,).concat(candidateList.slice(index+1)));
    console.log('Candidate rejected! New candidate list is:')
    console.log(candidateList);
  }

  // When the state changes run this callback
  useEffect(() => {
    // Update the localStorage count variable using the setItem method
    console.log('Updating candidate list to:');
    console.log(candidateList);

    localStorage.setItem('candidateList', JSON.stringify(candidateList));
  });

  return (
    <>
      <h1>Potential Candidates</h1>
      {(candidateList.length <= 0) ? <h2> There are no candidates to display</h2> :
      <table className='table'>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {candidateList.map((candidate, index) => {return <tr key={index}>
            <td id='img-container'><img id='table-img' src={candidate.avatar_url}></img></td>
            <td>{candidate.login}</td>
            <td>{candidate.location || 'None provided'}</td>
            <td>{candidate.email || 'None provided'}</td>
            <td>{candidate.company || 'None specified'}</td>
            <td id='td-bio'>{candidate.bio || 'None provided'}</td>
            <td><button id='table-button' onClick={() => rejectCandidate(index)}><img src='./images/reject.png'></img></button></td>
          </tr>})}
        </tbody>
      </table>}
    </>
  );
};

export default SavedCandidates;
