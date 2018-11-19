---
layout: page
permalink: /documents/protocol/4/
---

##Protokoll 4. Gruppentreffen

#Organisatorisches
- bis 19.11. 2-3 Terminvorschläge für Prototyp

#Lastenheft
- kein Pflichtenheft
- einziges Dokument mit Anforderungen des Kunden und Entwickler an Software
- inhaltlich konsistent
- in LaTeX schreiben
- Anführungszeichen nochmal prüfen
- Änderungsverzeichnis
- Punkte der Handreichung abarbeiten
- Einleitung empfehlenswert
- Ziele mit ID versehen (z.B. LF0010: Registrierung
- Qualitätsmatrix: 8 Punkte, in Tabelle mit hoch, mittel, niedrig, nicht anwendbar
-> Begründung warum und erklären
- Definitionen ins Glossar

####Anforderungen
- funktional
-> für Projekt spezifisch: neues Inventar hinzufügen
-> wenn funktionale geändert, keine Änderung der Architektur
- nicht funktionale: Zeitverhalten, Sicherheit/Datenschutz, Ressourcenverbrauch 
-> wirkt sich auf Architektur und Design aus

####Ziele
- Muss- und Kannziele
- 110% der Ziele in Lastenheft

####Qualitätsmatrix
- ISO25010 
- Funktionalität

####Vorprojekt
- Einarbeitung in Sprachen, Framworks, CI/CD
- Proof-of-Cencept
- Evaluation / Review
- nicht groß, nicht viel, hauptsache funktioniert (Framework kommuniziert mit Daten)

#Konzepte
- Standards 
- Modelle
- Funktionalitäten 
- etablierte Mechanismen

#Aspekte
- Restriktoren 
- User Experience
- Marktsituation (Anwendungsort)
- Datenschutz
- Lizenzen

#Aufwandsbericht: Feedback
- Aufwandsberichte auf Website und Git
- im OLAT Schema 
- Datum in TT-MM-YY Format - keine Punkte
- Git komplett rauswerfen bei Begriffe - nicht projektbezogen 
- in Begriffe Frameworks, Methoden, etc. erklären
- explizierte Frameworks reinnehmen und begründen, warum diese und wofür
- bei Aspekte: Methoden, Technologien, Entwicklungsprozess
- Maven: nicht definieren, sondern begründen, warum und wofür
-> darauf achten, was wir entwickeln wollen und nicht allgemein bleiben

##Protokoll 4. internes Gruppentreffen

#Rollenverteilung
- Backend: Maurice, Max, Leon, Steve
- Frontend: Leon K, Alex
- Design: Sina

####Frontend
- Angular
- Experte: Alex 

####Datenbank
- Mongodb

#App
- Authentifizierung
- Benutzerverwaltung
- einzig öffentliche: Login
- Admin mit eigener Admin-Seite als Menüunterpunkt (mit Company-Verwaltung)

