---
slug: /users
---

# Użytkownicy

## Status użytkownika

![Diagram statusu użytkowniak](/img/docs/users-user-status.drawio.svg)

## Najaktywniejsi użytkownicy

Pokaż najlepszych użytkowników.

- **Użytkownicy o najwyższej reputacji w tym tygodniu**
  - Użytkownicy, którzy w tym tygodniu najbardziej podnieśli swoją reputację
  - Pokaż 20 najlepszych użytkowników z najwyższym wzrostem reputacji(wg kolejności)
- **Użytkownicy, którzy najwięcej głosowali w tym tygodniu**
  - Ilość głosów oddanych dla innych
  - Pokaż 20 najlepszych użytkowników z ich liczbą głosów (lista uporządkowana)
- **Aktywność moderatorów**
  - Wyświetl wszystkich moderatorów i administratorów
  - Uporządkowane według reputacji

## Zarejestruj się

Rejestracja użytkownika za pomocą adresu email.

![Proces rejestracji](/img/docs/users-signup.drawio.svg)

- Nazwa wyświetlana (w skrócie "nazwa"):
  - Mniej niż 30 znaków.
- Nazwa użytkownika:
  - Unikalna.
  - Mniej niż 30 znaków.
  - Może zawierać tylko `0-9`, małe litery `a-z`, symbole `-`, `.` i `_`.
  - Wygenerowana na podstawie nazwy wyświetlanej, spacje są zastępowane symbolem `-`.
  - Jeśli się powtarza, dodaj na końcu 4 losowe znaki, np. `joe-x7k2`.
  - Zarezerwowane słowa kluczowe nie są dozwolone.
- Zapisuj czas rejestracji oraz adres IP.
- Link aktywujący jest ważny przez 14 dni.

## Zaloguj się

Użytkownik chce się zalogować. Uprawnienia logowania użytkownika są powiązane z jego statusem.

| Status Użytkowanika | Normalny  | Nieaktywny | Zawieszony | Usunięty   |
| ------------------- | --------- | ---------- | ---------- | ---------- |
| Logowanie           | Dozwolone | Zabronione | Zabronione | Zabronione |

### Zaloguj się używając emaila i hasła

- Wpisz adres email i hasło, aby się zalogować.
  - Jeśli użytkownik nie istnieje, wyświetla się wiadomość "Nieprawidłowy adres email lub hasło", aby zapobiec atakom na konta.
  - Gdy nieaktywny użytkownik się zaloguje, przejdzie do strony, która prosi o aktywację.
  - Kiedy zawieszony użytkownik zaloguje się, przejdzie do strony z informacją o zawieszeniu.
- Domyślnie status logowania jest zapamiętany przez 14 dni.
- W przypadku gdy ktoś zapomniał hasła można je zresetować klikając na "Zapomniałem hasło".

### Zaloguj się używając dostawców zewnętrznych OAuth

![Procesy komunikacji OAuth](/img/docs/users-oauth.drawio.svg)

## Resetuj hasło

TODO

## Powiadomienie

TODO

### Skrzynka odbiorcza

TODO

### Osiągnięcia

TODO

## Profil

TODO

## Ustawienia

TODO

### Anuluj subskrypcję email

TODO
