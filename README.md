# phase4-week1-restaurant-code-challange

## Introduction
- The flask API manages the CRUD(create, read , update and delete) operations performed by the user in the front-end.
- We use 'semantic ui' in this application instead of 'Bootstrap'.
- The main languages used are 'python3' and 'javascript'.

### Prerequisites

- Python 3
- Flask
- Semantic UI.
- SQLAlchemy
- Flask-RESTful 
- Database (e.g., SQLite, PostgreSQL)


## Installation

1. Clone the repository
```sh
git clone git@github.com:SolveMMG/0.Code-Challenge-pizzas.git
```

2. Enter the virtual environment:
```sh
pipenv shell
```

3. Navigate to server directory: 
```sh
cd server
```

4. Populate the database: 
```sh
python3 seed.py
```

5. State the database: 
```sh
flask run
```

6. Open another terminal, navigate to client directory: 
```sh
cd client
```
7. Activate the front-end:
```sh
npm start
```


## Database Models
The database had three tables: Pizza, Restaurant and RestaurantPizza:
- A `Restaurant` has many `Pizza`s through `RestaurantPizza`
- A `Pizza` has many `Restaurant`s through `RestaurantPizza`
- A `RestaurantPizza` belongs to a `Restaurant` and belongs to a `Pizza`

## Validations
RestaurantPizza Model: Price validation enforces that the price is between 1 and 30.

## LICENSE
Copyright <2023> 
<MICHAEL MURAYA THOMAS>

- Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
```sh
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

