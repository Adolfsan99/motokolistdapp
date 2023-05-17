export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Homework__1 = IDL.Record({
    'title' : IDL.Text,
    'completed' : IDL.Bool,
    'dueDate' : Time,
    'description' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'ok' : Homework__1, 'err' : IDL.Text });
  const Homework = IDL.Service({
    'addHomework' : IDL.Func([Homework__1], [IDL.Nat], []),
    'deleteHomework' : IDL.Func([IDL.Nat], [Result], []),
    'getAllHomework' : IDL.Func([], [IDL.Vec(Homework__1)], []),
    'getHomework' : IDL.Func([IDL.Nat], [Result_1], []),
    'getPendingHomework' : IDL.Func([], [IDL.Vec(Homework__1)], []),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'markAsCompleted' : IDL.Func([IDL.Nat], [Result], []),
    'markAsPending' : IDL.Func([IDL.Nat], [Result], []),
    'searchHomework' : IDL.Func([IDL.Text], [IDL.Vec(Homework__1)], []),
    'updateHomework' : IDL.Func([IDL.Nat, Homework__1], [Result], []),
  });
  return Homework;
};
export const init = ({ IDL }) => { return []; };
