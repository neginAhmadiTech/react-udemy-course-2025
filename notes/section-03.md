## Components Hierarchy

All components start from the following entrypoint root component:

```JavaScript
    const entryPoint = document.getElementById("root");
    ReactDOM.createRoot(entryPoint).render(<App />);
```

---

## Rules of hooks

- only call hooks inside of component functions
- only call hooks on the top level

---

## Important Points

- Images should be imported, not hardcoded in an img tag. Because they will be ignored in build process:

```JavaScript
    // correct
    import MyImage from './assets/react-core-concepts.png'
    <img src={MyImage} alt="Stylized atom" />

    // false way
     <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
```

<br><br>

- If we have a function with input params, then we should pass it to our custom component like the following:

```JavaScript
    <TabButton onSelect={() => handleSelect('jsx')}>JSX</TabButton>
    <TabButton onSelect={() => handleSelect('props')}>Props</TabButton>
```

<br>
If we don't have props we should pass it with the following syntax:

```JavaScript
    <TabButton onSelect={handleSelect}>JSX</TabButton>
```

<br><br>

- By default, react components execute once. You have to "tell" react if a component should execute again. For that, we use states

<br><br>

- In the following, the ui updates each time we click on the new tab. useState stores the current selectedValue for the next rendering cycle of the component. And when it re-renders, it shows the new value. But the selectedValue remains the previous state of the selectedValue. So when we console.log() it, we see the previous value in the console meantime we see the current value in the ui. The new value is set only after re-rendering:

```JavaScript
function App() {
  const [ selectedTopic, setSelectedTopic ] = useState('Please click a button');

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
    console.log(selectedTopic);
  }

  console.log('APP COMPONENT EXECUTING');

  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept
              title={CORE_CONCEPTS[0].title}
              description={CORE_CONCEPTS[0].description}
              image={CORE_CONCEPTS[0].image}
            />
            <CoreConcept {...CORE_CONCEPTS[1]} />
            <CoreConcept {...CORE_CONCEPTS[2]} />
            <CoreConcept {...CORE_CONCEPTS[3]} />
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton onSelect={() => handleSelect('components')}>
              Components
            </TabButton>
            <TabButton onSelect={() => handleSelect('jsx')}>JSX</TabButton>
            <TabButton onSelect={() => handleSelect('props')}>Props</TabButton>
            <TabButton onSelect={() => handleSelect('state')}>State</TabButton>
          </menu>
          {selectedTopic}
        </section>
      </main>
    </div>
  );
}
```
