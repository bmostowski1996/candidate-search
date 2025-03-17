import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const currentPage = useLocation().pathname;
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <ul className="nav">
      <li className={`nav-item`}>
        <Link to='/' className={currentPage === '/' ? 'active' : ''}>Home</Link>
      </li>
      <li className="nav-item">
        <Link to='SavedCandidates' className={currentPage === '/SavedCandidates' ? 'active' : ''}>Saved Candidates</Link>
      </li>
    </ul>
  )
};

export default Nav;
