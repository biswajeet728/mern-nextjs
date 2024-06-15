"use client";

import React, { useEffect, useRef, useState } from "react";

type ActionFn = () => Promise<any> | any;

type RenderFnProps = {
  run: () => void;
  loading: boolean;
};

type RenderFn = (args: RenderFnProps) => React.ReactElement;

interface Props {
  action: ActionFn;
  render: RenderFn;
}

function AsyncButton(props: Props) {
  const { action, render } = props;
  const [loading, setLoading] = useState(false);
  const canceledRef = useRef(false);

  const run = async () => {
    if (loading || !action) {
      return;
    }

    setLoading(true);
    canceledRef.current = false;

    try {
      await action();
    } catch (error) {
      if (canceledRef.current) {
        return;
      }
    } finally {
      if (!canceledRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      canceledRef.current = true;
    };
  }, []);

  if (render) {
    return render({ run, loading });
  }

  return null;
}

export default AsyncButton;
