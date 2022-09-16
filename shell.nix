with import <nixpkgs> { };
let
  name = "Party Wizard";
  pythonEnv = python310.withPackages (ps: [
    #   # ps.django_4
    ps.djangorestframework
    ps.django-cors-headers
    ps.djangorestframework-simplejwt
    ps.pyjwt
    ps.django-filter

    ps.bpython
    ps.black
  ]);

in
mkShell {
  buildInputs = [
    pythonEnv

    bmake
    http-prompt
  ];
}
