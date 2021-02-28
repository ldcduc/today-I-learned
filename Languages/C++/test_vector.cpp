#include <iostream>
#include <vector>

using namespace std;

void Test_capacity() {
    vector<int> a;
    int n;
    cin >> n;
    for (int i = 1; i <= n; ++ i) {
        a.push_back(i);
        /* cout << a.size() << ' ' << a.capacity() << endl; */
    }
    cout << (int) a.size() << ' ' << (long long) a.max_size() << endl;
    cout << (int) a.capacity() << endl; // power of two
}

void Test_stack_heap(int c) {
    int d;
    cout << &c << ' ' << &d << endl;
    vector<int> v;
    int *p = new int (10); // new int(10) is allocated on the heap
    cout << "Pointer address in heap " << p << endl;
    for (int i = 0; i < c; ++ i) {
        v.push_back(i);
        cout << i << ' ' << &v << ' ' << &v[0] << ' ' << &v[i] << endl;
    }
    /* v is allocated on the stack */
    /* v[i] is allocated on the heap */
}

void Test_stack_heap_pointer(int c) {
    int d;
    cout << &c << ' ' << &d << endl;
    vector<int> *v = new vector<int>;//(c);
    int *p = new int (10);
    cout << "Pointer address in heap " << p << endl;
    for (int i = 0; i < c; ++ i) {
        v->push_back(i);
        /* (*v)[i] = i; */
        cout << "Value = " << (*v)[i] << endl;
        cout << "Index = " << i << " Address of v = " << &v << " Address of (*v)[0] = " << &((*v)[0]) << " Address of (*v)[" << i << "] = " << &((*v)[i]) << endl;
    }
    // Reallocate when reach max capacity
    /* v is allocated on the stack */
    /* v[i] is allocated on the heap */
}

int main() {
    /* Test_capacity(); */
    /* Test vector */
    int a, b;
    cout << &a << ' ' << &b << endl;
    /* Test_stack_heap(5); */
    Test_stack_heap_pointer(10);
    return 0;
}
