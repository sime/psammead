import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import when from 'ramda/src/when';
import is from 'ramda/src/is';
import { number, string, node, oneOfType } from 'prop-types';
import styled from 'styled-components';

const convertToPixels = num => `${num}px`;

const getSize = when(is(Number), convertToPixels);

const getHeight = ({ wrapperHeight }) => getSize(wrapperHeight);

const getWidth = ({ wrapperWidth }) => getSize(wrapperWidth);

const Wrapper = styled.div`
  overflow: auto;
  height: ${getHeight};
  width: ${getWidth};
`;

const initIntersectionObserver = ({ wrapperEl, setWrapperIO }) => () => {
  // component did mount
  let IO;
  const init = () => {
    const callback = ([wrapperEntry]) => {
      setWrapperIO(wrapperEntry);
    };
    IO = new IntersectionObserver(callback);
    IO.observe(wrapperEl.current);
  };

  if ('IntersectionObserver' in window) {
    init();
  } else {
    import('intersection-observer').then(() => {
      IntersectionObserver.prototype.POLL_INTERVAL = 100;
      init();
    });
  }
  const cleanup = () => {
    IO.disconnect();
  };
  return cleanup;
};

const initResizeObserver = ({ wrapperEl, setContentElRect }) => () => {
  let RO;

  const init = ResizeObserver => {
    const callback = ([contentEntry]) => {
      setContentElRect(contentEntry.contentRect);
    };
    RO = new ResizeObserver(callback);
    RO.observe(wrapperEl.current.firstChild); // will break if using a fragment :thinking:
  };

  if ('ResizeObserver' in window) {
    init(ResizeObserver);
  } else {
    import('resize-observer-polyfill').then(module => {
      const ResizeObserver = module.default;
      init(ResizeObserver);
    });
  }
  const cleanup = () => {
    RO.disconnect();
  };
  return cleanup;
};

const isScrollAnchoringSupported = () => {
  // https://drafts.csswg.org/css-scroll-anchoring/
  if ('CSS' in window) {
    return CSS.supports('overflow-anchor', 'auto');
  }
  return false;
};

const ContentShiftBlocker = ({ children, initialHeight, initialWidth }) => {
  const wrapperEl = useRef(null);
  const scrollHeight = useRef(null);
  const scrollAnchoringIsSupported = useRef(null);
  const [wrapperIO, setWrapperIO] = useState({});
  const [contentElRect, setContentElRect] = useState({});
  const [wrapperDimensions, setWrapperDimensions] = useState({
    height: initialHeight,
    width: initialWidth,
  });

  useEffect(initIntersectionObserver({ setWrapperIO, wrapperEl }), []); // runs only on mount
  useEffect(initResizeObserver({ setContentElRect, wrapperEl }), []); // runs only on mount
  useEffect(() => {
    // runs only on mount
    isScrollAnchoringSupported.current = isScrollAnchoringSupported();
  }, []);

  useLayoutEffect(() => {
    // child content did resize
    const wrapperIsOutOfView = wrapperIO.isIntersecting === false;

    if (wrapperIsOutOfView) {
      // wrapper will resize
      const wrapperIsAboveViewport = wrapperIO.boundingClientRect.top < 0;
      const {
        width: nextWrapperWidth,
        height: nextWrapperHeight,
      } = contentElRect;

      if (!scrollAnchoringIsSupported.current && wrapperIsAboveViewport) {
        scrollHeight.current = document.body.scrollHeight;
      }

      setWrapperDimensions({
        width: nextWrapperWidth,
        height: nextWrapperHeight,
      });
    }
  }, [contentElRect]);

  useEffect(() => {
    // wrapper did resize
    if (scrollAnchoringIsSupported.current || scrollHeight.current === null) {
      return;
    }

    const { scrollHeight: newScrollHeight } = document.body;
    const { current: prevScrollHeight } = scrollHeight;
    const scrollHeightDiff = prevScrollHeight - newScrollHeight;
    const scrollY = window.pageYOffset;

    if (scrollHeightDiff && scrollY > 0) {
      // adjust scrollY position to prevent visible jump
      window.scrollTo(0, scrollY - scrollHeightDiff);
    }
  }, [wrapperDimensions]);

  return (
    <Wrapper
      wrapperWidth={wrapperDimensions.width}
      wrapperHeight={wrapperDimensions.height}
      ref={wrapperEl}
    >
      {children}
    </Wrapper>
  );
};

ContentShiftBlocker.propTypes = {
  children: node.isRequired,
  initialHeight: oneOfType([number, string]),
  initialWidth: oneOfType([number, string]),
};

ContentShiftBlocker.defaultProps = {
  initialHeight: 'auto',
  initialWidth: 'auto',
};

export default ContentShiftBlocker;
