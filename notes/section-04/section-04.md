## Dynamically setting the wrapper type to a component

(watch again section 11 for more info about this)

```JavaScript
export default function Tabs({ children, buttons, ButtonsContainer }) {
  // const ButtonsContainer = buttonsContainer;
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}

// another component using this
<Tabs
    ButtonsContainer = 'menu',
    buttons={
        <>
        <TabButton
            isSelected={selectedTopic === 'components'}
            onClick={() => handleSelect('components')}
        >
            Components
        </TabButton>
        <TabButton
            isSelected={selectedTopic === 'jsx'}
            onClick={() => handleSelect('jsx')}
        >
            JSX
        </TabButton>
        <TabButton
            isSelected={selectedTopic === 'props'}
            onClick={() => handleSelect('props')}
        >
            Props
        </TabButton>
        <TabButton
            isSelected={selectedTopic === 'state'}
            onClick={() => handleSelect('state')}
        >
            State
        </TabButton>
        </>
    }
    >
    {tabContent}
</Tabs>

```

## Points

- If we want to pass multiple props that their name is exactly the name of the inner component prop we can pass all of them like the following. It's more efiicient and scalable:

  ✅ right way :

  ```JavaScript
  export default function CoreConcepts() {
    return (
      <section id="core-concepts" className="active">
        <h2>Core Concepts</h2>
        <ul>
          {CORE_CONCEPTS.map((conceptItem) => (
            <CoreConcept key={conceptItem.title} {...conceptItem} />
          ))}
        </ul>
      </section>
    );
  }

  export default function Section({ title, children, ...props }) {
    return (
      <section {...props}>
        <h2>{title}</h2>
        {children}
      </section>
    );
  }

  ```

  ❌ wrong way :

  ```JavaScript
  export default function CoreConcepts() {
    return (
      <section id="core-concepts" className="active">
        <h2>Core Concepts</h2>
        <ul>
          {CORE_CONCEPTS.map((conceptItem) => (
            <CoreConcept key={conceptItem.title} {...conceptItem} />
          ))}
        </ul>
      </section>
    );
  }

  export default function Section({ title, children, id, className}) {
    return (
      <section id={id} className={className}>
        <h2>{title}</h2>
        {children}
      </section>
    );
  }
  ```

<br /><br />

- We don't always have to put our code into a new component. sometimes it's better to put it into the index.html file (for a situation that we have a static data)

  ```HTML
  <body>
      <header>
        <img src="game-logo.png" alt="Hand-drawn tic tac toe game board" />
        <h1>Tic-Tac-Toe</h1>
      </header>
      <div id="root"></div>
      <script type="module" src="/src/index.jsx"></script>
    </body>
  ```

<br /><br />

- Any files (of any format) stored in src (or subfolders like src/assets/) are not made available to the public. They can't be accessed by website visitors. If you try loading localhost:5173/src/assets/some-image.jpg, you'll get an error.
  Instead, files stored in src/ (and subfolders) can be used in your code files. Images imported into code files are then picked up by the underlying build process, potentially optimized, and kind of "injected" into the public/ folder right before serving the website. Links to those images are automatically generated and used in the places where you referenced the imported images.
  **Which Folder Should You Use?**
  You should use the public/ folder for any images that should not be handled by the build process and that should be generally available. Good candidates are images used directly in the index.html file or favicons.
  On the other hand, images that are used inside of components should typically be stored in the src/ folder (e.g., in src/assets/).

  <br /><br />

- In React, when we wanna update our state based on the previous value of that state it's not a good way to do it like the following:

  ```JavaScript
  function handleEditing() {
      setIsEditing(!isEditing);
    }
  ```

  **BEST PRACTICE** Instead we should pass a function to that function updating the state. Because this function will be called by React and it will automatically get the current state value as an input. In this case React alway guarentees that we work with the latest available state value:

  ```JavaScript
  function handleEditing() {
    const [isEditing, setIsEditing] = useState(false)
      // this will dynamically be set and passed as a value by react when it calls this function
      // and this function should return the new state we wanna set
      setIsEditing((editing)=>!editing); // true
      setIsEditing((editing)=>!editing); // false
    }
  ```

  ```JavaScript
  function handleEditing() {
    const [isEditing, setIsEditing] = useState(false)
    // react will schedule the state and both of them are based on the current value of isEditing which is false
    // so the result will not be the thing we expected
    setIsEditing(!isEditing); // schedules a state update to true, but does not emidiately change that state
    setIsEditing(!isEditing); // this one also schedules a state update to true, because the state is still false and it hasn't changed
  }
  ```

  در اصل وقتی یه تابع رو بهش پاس میدیم دقیقا همون موقع مقدار ستیت رو آپدیت میکنه و توی خط بعدی میتونیم مقدار جدید آپدیت شده رو استفاده کنیم. ولی توی حالت دیگه اون مقدار آپدیت شده رو توی یه زمانبندی مثلا 1000 میلی ثانیه ای قرار میده که تو آینده تغییرش بده و ممکنه که اون مقدار جدید آپدیت شده توی خط بعدی در دسترس ما نباشه و اطلاعات اشتباهی رو به ما بده.

  ![](./state-update.png)

  **NOTE** watch section 22 for reviewing this part

<br /><br />

- For adding the ability to edit an input we can use defaultValue instead of value prop:

  ```JavaScript
  ❌ <input type="text" required value={name} />
  ✅ <input type="text" required defulatValue={name} />
  ```

<br /><br />

- **Two way binding:** It means that we feeding in an element (for example an input) by the outputed value of that element:

  ```JavaScript
  const [editedName, setEditedName] = useState(initialName);
  function handleChange(event) {
      setEditedName(event.target.value);
  }

    <input
      type="text"
      required
      value={editedName}
      onChange={handleChange}
    />
  ```

<br /><br />

- **BEST PRACTICE** If our state is an array or an object we update that state in an immutable way

  ![image](./object-state-update.png)

  ```JavaScript
  const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
  ];

  export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, colIndex) {
      setGameBoard((prevGameBoard) => {
        const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
        updatedBoard[rowIndex][colIndex] = 'X';
        return updatedBoard;
      });
    }
  ```

  <br /><br />

- **Lifitng state up**

  ![](./lifting-state-up.png)

  <br /><br />

- **BEST PRACTICE** In React we should write the least states and instead derive and compute as many values as needed from that state [watch section 30]
