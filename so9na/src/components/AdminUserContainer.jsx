import React from 'react';

const AdminUserContainer = () => {
    return (
        <div className='admin-user-container' >
            <h1>Utilisateur</h1>
            <div className="statistique-user">
            <div className="statistique-user-container">
           <h3>Le nombre d'utilisateur en ligne</h3>
  
           <p>3 <span>Utilisateur</span></p>
    
           <div className="user-type">
           <div className="p-span">
           <p>4 </p>
           <span>Inscrit</span>
           </div>
           <div className="p-span">
           <p>3 </p>
           <span>Connecter</span>
           </div>
           <div className="p-span">
           <p>2</p>
           <span>banis</span>
           </div>
           </div>
            </div>
            </div>
            <div className="admin-user-table">
            <table>
                    <thead>
                        <tr>
                            <th>Colonne 1</th>
                            <th>Colonne 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>vv</td>
                        </tr>
                        <tr>
                            <td>vv</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminUserContainer;