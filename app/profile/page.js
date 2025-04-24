'use client';
import { useAuth } from '@/contexts/AuthContext';
import { Box, Typography, Button, Paper, Container, Avatar } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  
  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <Typography>Caricamento...</Typography>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
          }}
        >
          <Avatar sx={{ width: 80, height: 80, mb: 3, bgcolor: 'primary.main' }}>
            <PersonIcon fontSize="large" />
          </Avatar>
          
          <Typography variant="h4" component="h1" gutterBottom>
            Profilo Utente
          </Typography>
          
          <Box sx={{ width: '100%', mt: 3 }}>
            <Typography variant="body1" sx={{ py: 1, borderBottom: '1px solid #eee' }}>
              <strong>Username:</strong> {user.username}
            </Typography>
            
            <Typography variant="body1" sx={{ py: 1, borderBottom: '1px solid #eee' }}>
              <strong>Email:</strong> {user.email || 'Non specificata'}
            </Typography>
            
            <Typography variant="body1" sx={{ py: 1, borderBottom: '1px solid #eee' }}>
              <strong>Ruolo:</strong> {user.role || 'Utente'}
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            onClick={logout}
            sx={{ mt: 4 }}
          >
            Logout
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}