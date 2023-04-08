export const modalWrVariants = {
  start: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      when: 'beforeChildren'
    }
  },
  end: {
    opacity: 0,
    transition: {
      when: 'afterChildren'
    }
  }
};

export const modalInnerVariants = {
  start: {
    opacity: 0,
    y: 200
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4,
      duration: 0.6
    }
  },
  end: {
    opacity: 0,
    y: 200
  }
};
