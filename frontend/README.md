## Contributing to the UI

You know the drill. Fork this repo, clone your copy onto your machine, create your branch, commit your changes and push.

If you're new to opensource, you can take a look at the [contributing guideline here](../CONTRIBUTING.md#getting-started). It highlights the step you can follow.

## Project structure

Since We're going to be working on this together. Sit tight, Let's walk through the architecture of the project.

[src/](src) is where most of the magic will be made. In it we have [components/](src/components), [containers/](src/containers), [layout/](src/layout) and [utils/](src/utils).

All reusable components should go into the `components/` folder. Reusable in this sense, refers to components that have global scope, some example could be `<Button />`, `<Search />` and `<Card />` components. Feel free to add more.

But, since we're using [Chakra UI](https://chakra-ui.com) as our UI component library. You may not entirely need to create these aformentioned components &mdash; like `<Button />` or `<Card />` as Chakra already extends that for us.

But, whenever we need custom components for our own use-case, you can definitely place them in the [components/](src/components/) directory.

## Let's put pages components in the `containers/` subdir, please.

We shouldn't bloat the files in the `pages/` route. Instead, let's have scoped page/route components in the `containers/`. If you go into the containers folder. As we progress you can add more components that are scoped to the pages route in this folder.

To see this, in action. You can open the [`@containers/home`](src/containers/home/index.tsx), and you'll see how the component is referenced.

When you look closely, you'd also see that the way the components are being imported is a bit different.

```tsx
import Hero from "@components/hero";
import { useRouter } from "next/router";
import Events from "@components/event-card";
import { Box, Text } from "@chakra-ui/react";
import { Categories, Location } from "@components/categories";

const Home = () => {
  const { query } = useRouter();
  const { location, category } = query;

  return (
    <>
      <Hero />
      <Box my="1em">
        <Text fontFamily="var(--bebas)" fontSize="2em" color="#fff" mt="1.3em">
          Events happening {location === "online" || !location ? "" : "in"}
        </Text>
      </Box>
      <Location />
      <Categories />
      <Events data={events} />
    </>
  );
};

export default Home;
```

Instead of the approach you may be familiar with &mdash; `import component from "../path/to/directory"`, we'd be referencing the component with an import alias like the one below; So you don't have to keep doing `"../../../../"` whenever you need to use a component.

```tsx
import AppLayout from "@layout/appLayout";
import Card from "@components/card";
```

Although, this is already a feature (import aliases) provided out-of-the box from the latest version of Next.js &mdash; areound next13 upwards or so.

The `layout/` directory houses all global and reusable layouts of the App. So, when you notice that you're already repeating yourself over and over by creating a certain layout UI. Please move it into this folder. An example could be the `<Sidebar/>` and a `<UserProfile />` component. Merge them together and allow them receive a `ReactNode` or `HTMLElement` as prop.

Since the design of the project isn't that huge, I doubt we'd be creating that much layouts. But, when the need arises, feel free to do so.

In `utils/`, we can place all our helper functions. data-fetcher(s), image optimization scripts, blah blah blah.

`utils/theme` contains all our themeable settings/preference for Chakra. For now, we're only configuring the `initialColorMode` and `useSystemColorMode`

And lest I forget, we have the [styles/](styles) folder. All the global styles regarding this project will be kept in it. From design tokens with CSS variables to custom animations and some micro-interactions.

## Feel free to ask any question as we progress.

The stack we're using for this project is

- Next.js (React)
- Styling: no intense styling unless needed, that's why we're using Chakra

One last thing. If you notice any typo(s) in this README, please feel free to open a PR to correct it.

## state-management?

For now, I think there's just one component that depends on `React.useState`. Every other thing uses the browser URL as a source of truth for their states.

You can learn more on the **"WHY?"** [here](https://meje.dev/blog/keep-state-in-the-url)

## precommit-ing with husky.

Because we may run into having un-linted code in the future that would result in build errors when we deploy to Netlify. I've added a simple pre-commit check that ensures that the build process passes according to Typescript's standard.

I know that this may be maddening 😒 as [some people may hate the idea](https://www.youtube.com/watch?v=RAelLqnnOp0) of adding pre-commit hooks to their projects. But, it gets the job done.

Although, there are other approaches, like implementing a CI/CD process with Actions. I haven't really weighed the options, if you have, kindly suggest a way that it can be accomplished, and open a PR when you're done.

## Let's Go 🚀
