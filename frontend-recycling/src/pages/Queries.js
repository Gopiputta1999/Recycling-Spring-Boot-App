import React from 'react';
import "../css/Queries.css";
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const Queries = () => {
  const mockQueries = [
    {
      id: 1,
      name: 'Gopi Kishore',
      email: 'gkputta@gmail.com',
      modeOfContact: 'Email',
      reason: 'Details about recycling program',
      timestamp: '2024-11-07',
    },
    {
      id: 2,
      name: 'Ioannis',
      email: 'ioannis@gmail.com',
      modeOfContact: 'Phone',
      reason: 'Doubt about plastic waste collection',
      timestamp: '2024-11-07',
    },
    {
      id: 3,
      name: 'Maryam',
      email: 'maryamj@gmail.com',
      modeOfContact: 'Email',
      reason: 'Need details for partnership details',
      timestamp: '2024-11-07',
    },
   
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        User Queries
      </Typography>
      {mockQueries.length === 0 ? (
        <Typography variant="body1">No queries to display.</Typography>
      ) : (
        <List>
          {mockQueries.map((query) => (
            <ListItem key={query.id} divider>
              <ListItemText
                primary={`Name: ${query.name}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      Email: {query.email}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Mode of Contact: {query.modeOfContact}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Reason: {query.reason}
                    </Typography>
                    <br />
                    <Typography component="span" variant="caption">
                      Submitted on: {query.timestamp}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default Queries;
