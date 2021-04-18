import React, { useEffect, useContext } from 'react';
import { Layout, PageHeader } from 'antd';
import { ClubContext, useClubContext } from '../../context/Club';
import ClubComponent from '../../components/ClubComponent';
const { Content } = Layout;

const Home = () => {
  const { getClubs, clubState } = useContext(ClubContext);

  useEffect(() => {
    getClubs({ name: 'tennis', category: 'sport' });
  }, []);
  return (
    <div style={{ padding:25, backgroundColor: 'white !important' }}>

      {clubState.clubs ? (
        <PageHeader
          className="site-page-header-responsive"
          //onBack={() => window.history.back()}
          title="Clubs"
        >
          {clubState.clubs.map((club) => {
            return <ClubComponent
                clubName={club.name}
                clubDescription={club.description}
                category={club.category}
                members={club.members}
                key={club.id}
                club={club}
            />;
          })}
        </PageHeader>
      ) : (
        <p>No Club is available to show</p>
      )}
    </div>
  );
};
export default Home;