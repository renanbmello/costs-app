import React, { useState, useEffect } from 'react'
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import axios from 'axios'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const [items, setItems] = useState([])
  const [itemName, setItemName] = useState('')
  const [itemValue, setItemValue] = useState('')
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get(
          'https://costs-backend-1.onrender.com/items',
        )
        setItems(response.data)

        const total = response.data.reduce((acc, item) => acc + item.value, 0)
        setTotalValue(total)
      } catch (error) {
        console.error('Erro ao carregar itens:', error)
      }
    }
    fetchItems()
  }, [])

  const addItem = async () => {
    if (
      itemName.trim() !== '' &&
      !isNaN(itemValue) &&
      parseFloat(itemValue) > 0
    ) {
      const newItem = {
        name: itemName.trim(),
        value: parseFloat(itemValue),
      }
      try {
        const response = await axios.post(
          'https://costs-backend-1.onrender.com/items',
          newItem,
        )
        setItems([...items, response.data])
        setItemName('')
        setItemValue('')
        setTotalValue(totalValue + parseFloat(itemValue))
      } catch (error) {
        console.error('Erro ao adicionar item:', error)
      }
    } else {
      alert('Por favor, insira um nome e um valor válido para o item.')
    }
  }

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`https://costs-backend-1.onrender.com/items/${itemId}`)
      const updatedItems = items.filter((item) => item._id !== itemId)
      setItems(updatedItems)
      setTotalValue(totalValue - itemValue)
    } catch (error) {
      console.error('Erro ao excluir item:', error)
    }
  }

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
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
              <ListItemText
                primary={item.name}
                secondary={`R$ ${item.value.toFixed(2)}`}
              />
              <Button
                variant="contained"
                onClick={() => deleteItem(item._id, item.value)}
              >
                Excluir
              </Button>
            </ListItem>
          ))}
        </List>

        <Typography variant="h5" gutterBottom style={{ marginTop: '50px' }}>
          Total: R$ {totalValue.toFixed(2)}
        </Typography>
      </ThemeProvider>
    </div>
  )
}

export default App
