import React, { useState } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Typography, ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemValue, setItemValue] = useState('');
  const [totalValue, setTotalValue] = useState(0);

  const addItem = () => {
    if (itemName.trim() !== '' && !isNaN(itemValue) && parseFloat(itemValue) > 0) {
      const newItem = {
        name: itemName.trim(),
        value: parseFloat(itemValue),
      };
      setItems([...items, newItem]);
      setItemName('');
      setItemValue('');
      setTotalValue(totalValue + parseFloat(itemValue));
    } else {
      alert('Por favor, insira um nome e um valor válido para o item.');
    }
  };

  return (
    
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <ThemeProvider theme={darkTheme}>  
      <CssBaseline>
        <Typography variant="h4" gutterBottom>
            Adicionar Item
        </Typography>
        <TextField
            label="Nome do Item"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            style={{ marginRight: '10px' }}
        />
        <TextField
            label="Valor do Item"
            type="number"
            value={itemValue}
            onChange={(e) => setItemValue(e.target.value)}
            style={{ marginRight: '10px' }}
        />
        <Button variant="contained" onClick={addItem}>
            Adicionar
        </Button>

        <Typography variant="h4" gutterBottom style={{ marginTop: '50px' }}>
            Lista de Itens
        </Typography>
        <List>
            {items.map((item, index) => (
            <ListItem key={index}>
                <ListItemText primary={item.name} secondary={`R$ ${item.value.toFixed(2)}`} />
            </ListItem>
            ))}
        </List>

        <Typography variant="h5" gutterBottom style={{ marginTop: '50px' }}>
            Total: R$ {totalValue.toFixed(2)}
        </Typography>
        </CssBaseline>
      </ThemeProvider>  
    </div>
    
  );
}

export default App;
