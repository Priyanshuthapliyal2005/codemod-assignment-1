await waitFor(() => {
    expect(MyComponent.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  });
  