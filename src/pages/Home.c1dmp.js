const accordions = [
  {
    msb: "#msb1",
    expandIcon: "#expandIcon1",
    collapseIcon: "#collapseIcon1",
    collapsedState: "collapsed1",
    expandedState: "expanded1",
    question: "Where does my money go?",
    answer: "Lorem ipsum dolor sit amet..."
  },
  {
    msb: "#msb2",
    expandIcon: "#expandIcon2",
    collapseIcon: "#collapseIcon2",
    collapsedState: "collapsed2",
    expandedState: "expanded2",
    question: "Is my money safe?",
    answer: "Your money is protected in secure accounts..."
  },  
  {
    msb: "#msb3",
    expandIcon: "#expandIcon3",
    collapseIcon: "#collapseIcon3",
    collapsedState: "collapsed3",
    expandedState: "expanded3",
    question: "Can I cancel my monthly donation ?",
    answer: "Partial donations are still distributed..."
  },
  {
    msb: "#msb4",
    expandIcon: "#expandIcon4",
    collapseIcon: "#collapseIcon4",
    collapsedState: "collapsed4",
    expandedState: "expanded4",
    question: "Do I get a tax Receipt ?",
    answer: "Yes, you can cancel at any time..."
  },
  {
    msb: "#msb5",
    expandIcon: "#expandIcon5",
    collapseIcon: "#collapseIcon5",
    collapsedState: "collapsed5",
    expandedState: "expanded5",
    question: "Can I donate anonymously ?",
    answer: "You can contact support via email or phone..."
  }
];

let currentlyOpen = null;

$w.onReady(() => {
  accordions.forEach((acc, index) => {
    $w(acc.expandIcon).onClick(() => toggleAccordion(index));
    $w(acc.collapseIcon).onClick(() => toggleAccordion(index));
  });

  $w("#searchInput").onInput((event) => {
    const query = event.target.value.toLowerCase();

    accordions.forEach((acc, index) => {
      const combinedText = (acc.question + " " + acc.answer).toLowerCase();
      const match = combinedText.includes(query);

      if (match) {
        $w(acc.msb).show();
      } else {
        $w(acc.msb).hide();

  
        if (currentlyOpen === index) {
          $w(acc.msb).changeState(acc.collapsedState);
          rotateIcon($w(acc.collapseIcon), 0);
          currentlyOpen = null;
        }
      }
    });
  });
});

function toggleAccordion(index) {
  const acc = accordions[index];
  const box = $w(acc.msb);
  const isExpanded = (box.currentState.id === acc.expandedState);

  if (isExpanded) {
    box.changeState(acc.collapsedState);
    rotateIcon($w(acc.collapseIcon), 0);
    currentlyOpen = null;
  } else {
    if (currentlyOpen !== null && currentlyOpen !== index) {
      const prev = accordions[currentlyOpen];
      $w(prev.msb).changeState(prev.collapsedState);
      rotateIcon($w(prev.collapseIcon), 0);
    }

    box.changeState(acc.expandedState);
    rotateIcon($w(acc.expandIcon), 180);
    currentlyOpen = index;
  }
}

function rotateIcon(icon, angle) {
  icon.rotate({
    angle,
    duration: 300,
    easing: "easeInOutCubic"
  });
}
