'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import styles from "./page.module.css";

import React, { useState } from 'react';

export default function App() {
    const [userInput, setUserInput] = useState('');
    const [list, setList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [strikeItem, setStrikeItem] = useState({});

    const updateInput = (value) => {
        setUserInput(value);
    };

    const handleAction = () => {
        if (userInput.trim() === '') return;

        if (editIndex !== null) {
            const updatedList = list.map((item, index) =>
                index === editIndex ? { ...item, value: userInput } : item
            );
            setList(updatedList);
            setEditIndex(null); 
        } else {
            const newItem = {
                id: Math.random(), 
                value: userInput,
            };
            setList([...list, newItem]);
        }

        setUserInput(''); 
    };

    const deleteItem = (id) => {
        const updatedList = list.filter((item) => item.id !== id);
        setList(updatedList);
    };

    const startEdit = (index) => {
        setUserInput(list[index].value);
        setEditIndex(index); 
    };

    const strikeElement = (id) => {
        setStrikeItem((prev) => ({
            ...prev,
            [id]: !prev[id], 
        }));
    };

    return (
        <div className={styles.maindiv}>
            <div className={styles.head}>
                TODO LIST
            </div>
            <div>
                <input className={styles.input}
                    placeholder={editIndex !== null ? "Edit item..." : "Add item..."}
                    value={userInput}
                    onChange={(e) => updateInput(e.target.value)}
                />
                <button
                    onClick={handleAction} className={styles.addbtn}
                >
                    {editIndex !== null ? 'Update' : 'ADD'}
                </button>
            </div>
            <div className={styles.bodydiv}>
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <div key={item.id}  className={styles.list}>
                            <span className={`${styles.item} ${strikeItem[item.id] ? styles.strike : ""}`}>
                                {item.value}
                            </span>
                            <span>
                                
                                <button className={styles.deletebtn} onClick={() => deleteItem(item.id)} >
                                <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <button className={styles.strikebtn} onClick={() => strikeElement(item.id)}>❌</button>
                                <button onClick={() => startEdit(index)} className={styles.editbtn}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                            </span>
                        </div>
                    ))
                ) : (
                    <div className={styles.notadded}>
                        No items added...
                    </div>
                )}
            </div>
        </div>
    );
};


