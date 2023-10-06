% Facts
owner_of_dataset(okp41qljavkuszlclekhd2mjrnaexp4l6aljtnrvk6u, dataset1).
owner_of_dataset(okp41lvlxy332ct3kfkjpjagpm0g3lvckh9pfmnwfr5, dataset2).
authorized_user(okp41qljavkuszlclekhd2mjrnaexp4l6aljtnrvk6u, model1).
authorized_user(okp41lvlxy332ct3kfkjpjagpm0g3lvckh9pfmnwfr5, model2).
revenue_share(dataset1, model1, 70).  % 70% of revenue goes to dataset1 owner when model1 is used
revenue_share(dataset2, model1, 30).  % 30% of revenue goes to dataset2 owner when model1 is used
trained_on(model1, dataset1).
trained_on(model1, dataset2).


% Rules
is_owner(X, Dataset) :- owner_of_dataset(X, Dataset).
can_access_model(User, Model) :- authorized_user(User, Model).
revenue_split(Dataset, Model, Share) :- revenue_share(Dataset, Model, Share).
was_trained_on(Model, Dataset) :- trained_on(Model, Dataset).
