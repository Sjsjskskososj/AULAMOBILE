import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: Props) {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Item 1', description: 'Descrição do item 1', completed: false },
    { id: '2', title: 'Item 2', description: 'Descrição do item 2', completed: false },
    { id: '3', title: 'Item 3', description: 'Descrição do item 3', completed: false },
  ]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const newTask = route.params?.newTask;
    if (newTask) {
      setTasks(prev => [...prev, { ...newTask, completed: false }]);
      navigation.setParams({ newTask: undefined });
    }
  }, [route.params?.newTask]);

  const toggleCompleted = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  useEffect(() => {
    if (count === 10) {
      Alert.alert('Parabéns', 'Você atingiu 10 cliques!');
    }
  }, [count]);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>
        <Text style={[
          styles.cardTitle,
          item.completed && { textDecorationLine: 'line-through', color: 'gray' }
        ]}>
          {item.title}
        </Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.completeButton,
          { backgroundColor: item.completed ? '#6c757d' : '#28a745' }
        ]}
        onPress={() => toggleCompleted(item.id)}
      >
        <Text style={styles.buttonText}>
          {item.completed ? 'Desmarcar' : 'Concluir'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>

      <FlatList
        data={tasks}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        style={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Contador: {count}</Text>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => setCount(p => p + 1)}
        >
          <Text style={styles.buttonText}>Incrementar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.counterButton, { backgroundColor: '#dc3545' }]}
          onPress={() => setCount(0)}
        >
          <Text style={styles.buttonText}>Resetar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#28a745' }]}
        onPress={() => navigation.navigate('AddTasks')}
      >
        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  list: { flex: 1 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardDescription: { fontSize: 14, color: '#666', marginTop: 4 },
  separator: { height: 12 },
  counterContainer: { alignItems: 'center', marginVertical: 20 },
  counterText: { fontSize: 18, marginBottom: 10 },
  counterButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 
  },
  completeButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },

});
