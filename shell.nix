with import <nixpkgs> { };
let
  name = "Party Wizard";
  pythonEnv = python311.withPackages (ps: [
    # ps.django_4
    # ps.djangorestframework
    # ps.django-cors-headers
    # ps.djangorestframework-simplejwt
    # ps.pyjwt
    # ps.django-filter

    ps.flake8
    ps.bpython
    ps.autopep8
    # ps.black
  ]);

in
mkShell {
  buildInputs = [
    # pythonEnv
    python311

    bmake
    # http-prompt
  ];

  shellHook = ''
    echo "Enter to '${name}' env..."
    source env/bin/activate
    which python
    echo "Env activated"
  '';
}
