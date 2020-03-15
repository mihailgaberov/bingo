import WinPatternsAnimModule from '../../../src/winning/win-patterns-anim-module';

describe('WinPatternsAnimModule module', () => {
  test('Should get element container, rows, cols and patterns', () => {
    const container = document.createElement('section');
    let wpam = new WinPatternsAnimModule(container, 5, 5, 'horizontal');
    expect(wpam.elem).toBeDefined();
    expect(wpam.rows).toBeDefined();
    expect(wpam.cols).toBeDefined();
    expect(wpam.pattern).toBeDefined();
  });

  test(
    'Should call createDomElement to create the DOM structure of the module',
    () => {
      const container = document.createElement('section');
      const wpam = new WinPatternsAnimModule(container, 5, 5, 'horizontal');
      wpam.createDomElement = jest.fn();
      setTimeout(() => expect(wpam.createDomElement).toHaveBeenCalled());
    }
  );

  test(
    'Should call startAnimation method to animate the winning patterns',
    () => {
      const container = document.createElement('section');
      const wpam = new WinPatternsAnimModule(container, 5, 5, 'horizontal');
			wpam.startAnimation = jest.fn();
			setTimeout(() => expect(wpam.startAnimation).toHaveBeenCalled());
    }
  );

  test('Should be able to clear the animation module table', () => {
    const container = document.createElement('section');
    const wpam = new WinPatternsAnimModule(container, 5, 5, 'horizontal');
    expect(wpam.clearTable).toBeDefined();
  });

  test('Should have method for animating horizontal pattern', () => {
    const container = document.createElement('section');
    const wpam = new WinPatternsAnimModule(container, 5, 5, 'horizontal');
    expect(wpam.startHorizontalAnim).toBeDefined();
  });

  test('Should have method for animating vertical pattern', () => {
    const container = document.createElement('section');
    const wpam = new WinPatternsAnimModule(container, 5, 5, 'vertical');
    expect(wpam.startVerticalAnim).toBeDefined();
  });

  test('Should have method for animating diagonal pattern', () => {
    const container = document.createElement('section');
    const wpam = new WinPatternsAnimModule(container, 5, 5, 'diagonal');
    expect(wpam.startDiagonalAnim).toBeDefined();
  });
});
