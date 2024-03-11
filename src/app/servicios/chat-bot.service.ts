import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  private backendUrl = 'https://chat-bot-n15d.onrender.com/chat'; // URL de tu backend
  private readonly historyKey = 'chatbot_history'; 

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  private getHistory(): any[] {
    const historyString = sessionStorage.getItem(this.historyKey);
    return historyString ? JSON.parse(historyString) : [];
  }

  private setHistory(history: any[]): void {
    sessionStorage.setItem(this.historyKey, JSON.stringify(history));
  }

  enviarPregunta(question: string, history: any[]): Observable<any> {
    const body = { question, history };
    return this.http.post<any>(this.backendUrl, body);
  }

  enviarMensajeAlChatbot(mensaje: string): Observable<any> {
    let history = this.getHistory();
    history.push({ sender: 'user', message: mensaje }); // Agrega el mensaje del usuario al historial

    // Guarda el historial actualizado en sessionStorage
    this.setHistory(history);

    return this.enviarPregunta(mensaje, history);
  }
  
}