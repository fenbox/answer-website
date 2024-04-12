---
slug: /reputation
---

# Reputacja

Reputacja wykorzystywana jest do zautomatyzowania zarządzania wiarygodnością społeczności.

## Reguły zmiany reputacji

| Warunek                                 | Zmiana |
| --------------------------------------- | ------ |
| Ktoś zagłosuje na Twoje pytanie         | +10    |
| Ktoś zagłosuje na Twoją odpowiedź       | +10    |
| Ktoś akceptuje Twoją odpowiedź          | +15    |
| Akceptujesz kogoś odpowiedzi            | +2     |
| Twoja propozycja została zaakceptowana  | +2     |
| Zakwestionowałeś kogoś odpowiedź        | -1     |
| Twoje pytanie zostało zakwestionowane   | -2     |
| Twoja odpowiedź została zakwestionowana | -2     |

## Zasady dodatkowe

- Początkowa reputacja to `0`, po aktywacji, reputacja ma wartość `1`
- Jeśli istnieje akcja, która powoduje, że reputacja użytkownika jest `< 1`, wszelkie późniejsze działania, które zmniejszają reputację, nie zmniejszą już reputacji użytkownika
- Dzienna maksimum wartość reputacji to `200`
- Jeśli istnieje akcja, która powoduje, że dzienna reputacja użytkownika jest `> 200`, wszelkie późniejsze działania, które zwiększają reputację, nie zwiększają jej wartości dla tego użytkownika.
- Reputacja uzyskana z zaakceptowanych odpowiedzi nie jest ograniczona przez limit `200`
- Nie zdobywa się reputacji za akceptację własnych odpowiedzi
